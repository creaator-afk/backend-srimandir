const bcrypt = require("bcrypt");
const zod = require("zod");
const User = require("../models/UserModel");
const Profile = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
const Puja = require("../models/PujaModel");
const Payment = require("../models/PaymentModel");

function Repository() {}

Repository.getPujaPaymentWithMe = async (userRefId) => {
    const share = await Payment.find({ shareWith: userRefId }, { __v: 0, shareWith: 0 }).populate(
        "blog"
    );
    if (!share) {
        throw new Error("SHARE_NOT_FOUND");
    }
    return share;
};

Repository.getPujaPaymentdByMe = async (userRefId) => {
    const share = await Payment.find({ owner: userRefId }, { __v: 0, owner: 0 }).populate("blog");
    if (!share) {
        throw new Error("SHARE_NOT_FOUND");
    }
    return share;
};

Repository.createPayment = async (data, ownerRef) => {
    const schema = zod.object({
        blog: zod.string().min(24).max(24),
        accessPermission: zod.enum(["view", "edit"]),
        shareWith: zod.array(zod.string().min(24).max(24)),
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const shareAlreadyExist = await Payment.findOne({
        blog: data.blog,
        owner: ownerRef,
    }, {__v: 0, owner: 0});

    if (shareAlreadyExist) {
        return shareAlreadyExist;
    }

    const newPayment = await Payment.create({ ...data, owner: ownerRef });
    return {
        id: newPayment._id,
        owner: newPayment.owner,
        blog: newPayment.blog,
        accessPermission: newPayment.accessPermission,
        shareWith: newPayment.shareWith,
    };
};

Repository.editPaymentByUserId = async (data) => {
    const schema = zod.object({
        blog: zod.string().min(24).max(24),
        userRef: zod.string().min(24).max(24).optional(),
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const share = await Payment.findOneAndUpdate(
        { blog: data.blog, accessPermission: "edit" },
        data,
        { new: true }
    );
    if (share === null) {
        throw new Error("BLOG_NOT_SHARED");
    }
    return share;
};

Repository.editPuja = async (data, id) => {
    const schema = zod.object({
        title: zod.string().min(3).max(50).optional(),
        description: zod.string().min(3).max(10000).optional(),
        image: zod.string().min(3).optional(),
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const post = await Puja.findByIdAndUpdate(id, data, { new: true });
    return post;
};

Repository.createPuja = async (data, userRef) => {
    const schema = zod.object({
        title: zod.string().min(3).max(50),
        description: zod.string().min(3).max(10000),
        image: zod.string().min(3),
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const newPost = await Puja.create({ ...data, createdBy: userRef });
    return newPost;
};

Repository.getPujaById = async (id) => {
    return await Puja.findById(id, { __v: 0, createdBy: 0 });
};
Repository.getPujaByCategory = async (category) => {
    return await Puja.find({category: category}, { __v: 0, createdBy: 0 });
};
Repository.getPujaByTitle = async (title) => {
    return await Puja.find({title : {$regex : `.*${title}.*`}}, { __v: 0, createdBy: 0 });
}


Repository.getAllPuja = async (userRef) => {
    // TODO: paginate this
    const posts = await Puja.find({ createdBy: userRef }, { __v: 0, createdBy: 0 });
    return posts;
};

Repository.deletePuja = async (blogId) => {
    const blog = await Puja.findById(blogId, { _id: 1 });
    if (!blog) {
        throw new Error("BLOG_NOT_FOUND");
    }
    await blog.deleteOne();
    return blog;
};

Repository.createProfile = async (data, userRef) => {
    const schema = zod.object({
        firstName: zod.string().min(3).max(50),
        lastName: zod.string().min(3).max(50),
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const newProfile = await Profile.create({ ...data, createdBy: userRef });
    return newProfile;
};

Repository.checkUser = async (data) => {
    return await User.findOne({ username: data.username });
};

Repository.createUser = async function (user) {
    const schema = zod.object({
        username: zod.string().min(3).max(50),
        password: zod.string().min(8).max(20),
    });
    const validation = schema.safeParse(user);
    if (!validation.success) {
        throw new Error(validation.error);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.salt = salt;
    const newUser = await User.create(user);
    return newUser;
};

Repository.getTokens = function (user) {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
    });
    return { accessToken, refreshToken };
};

Repository.verifyToken = function (token) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
};

module.exports = Repository;

