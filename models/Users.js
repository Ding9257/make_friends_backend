const userDesc = require('./../lib/const').userDesc;
const util = require('./../lib/utils/utils');
const {Schema, model} = require('mongoose');

const users = new Schema({
    // _id
    fcmToken: {type: String, comment: 'fcm token'},
    countryCode: {type: String, comment: '国际区号'},
    mobile: {type: String, comment: '手机号'},
    password: {type: String, comment: '密码'},
    nickName: {type: String, comment: '昵称'},
    avatar: {type: String, comment: '头像'},
    photoWall: {type: [String], comment: '照片墙'},
    birthday: {type: String, comment: '生日'},
    gender: {type: Number, comment: '性别 1: 男 2 女 3 其他'},// 1Male 2Femal 3Prefer not to say
    ethnicity: {
        type: Number,
        comment: '种族1.Asian 2.African 3.Indian 4.Latino/Hispanic 5.Middle eastern 6.Caucasian 7.Mixed/other'
    },
    bodyType: {type: Number, comment: '身材 1.Slim 2.Athletic 3.Stout 4.Average'},
    children: {type: Number, comment: '孩子情况 1.No children 3.Children at home 4.Child not at home'},
    relationship: {type: Number, comment: '婚姻状况 1.Nerver Married 2.Seperated Divorced 3.Widowed 4.Tell you later'},
    smoke: {type: Number, comment: '吸烟 1.Don\'t 2.Smoke Socially 3.Smoke Regularly'},
    drink: {type: Number, comment: '喝酒 1.Don\'t 2.Smoke Socially 3.Smoke Regularly'},
    religion: {
        type: Number,
        comment: '宗教 1.Agnostaic,2.Atheist,3.Buddhist,4.Christian,5.Catholic,6.Hindu,7.Jewish,8.Muslim,9.Spiritual,10.Other'
    },
    education: {
        type: Number,
        comment: '教育 1.No degree 2.Hign school 3.Attended college 4.College graduate 5.Advanced degree'
    },
    workin: {
        type: Number,
        comment: '工作 1.Arts/Music/Writing 2.Banking/Finance Business 3.Management 4.Construction 5.Education 6.Entertainment/Media'
    },
    income: {
        type: Number,
        comment: '收入范围 1.No answer 2.Less than $30000 3.#30,001 to $50,000 4.$50,001 to $70,000 5.$100,001 to $150,000 6.$15,001 to $200,000 7.More than $200,001'
    },
    selfIntro: {type: String, comment: '自我介绍'},
    briefIntro: {type: String, comment: '简单简绍'},
    idealDate: {type: String},
    height: {type: Number, comment: '身高 cm'},
    weight: {type: Number, comment: '体重 KG'},
    // 最后活跃经纬度 结构 { lon(Number) : 40.739037, lat(Number): 73.992964 }
    activedLoc: {
        type: [Number],
        index: {type: '2dsphere', sparse: true}
        // lon: {type: Number, comment: "经度"},
        // lat: {type: Number, comment: "纬度"}
    },
    distance: {type: Number, comment: '米'},
    activedTime: {type: Date, comment: '最后活动时间'},
    activeStatus: {type: Number, default: 1, comment: '在线状态 1在线 2下线 3隐身'},
    createAt: {type: Date, comment: '创建时间'},
    updateAt: {type: Date, default: new Date(), comment: '更新时间'},
    status: {type: Number, default: 0, comment: '-1无效 0 有效'},
    membership: {type: Boolean, default: false, comment: '是否付费会员 default false'},
    autoPay: {type: Boolean, default: false, comment: '付费会员是否自动扣款 default false'},
    photoVerified: {type: Boolean, default: false, comment: '照片验证'},
    // memberTime: {type: Date, comment: '成为会员时间'},
    memberExpireTime: {type: Date, comment: '会员过期时间'},
    // 喜爱的音乐/歌手
    musics: [
        {
            _id: false,
            id: {type: String, comment: 'id'},
            name: {type: String, comment: '名称'},
            image: {type: String, comment: '图片'}
        }
    ],
    tvs: [
        {
            _id: false,
            id: {type: String, comment: 'tv id'},
            name: {type: String, comment: '标题'},
            poster_path: {type: String, comment: '封面'}
        }
    ],
    // 电影
    movies: [
        {
            _id: false,
            id: {type: String, comment: ' id'},
            title: {type: String, comment: '标题'},
            poster_path: {type: String, comment: '封面'}
        }
    ],
    // 喜爱的书籍
    books: [
        {
            _id: false,
            id: {type: String, comment: 'google books id'},
            title: {type: String, comment: '图书标题'},
            imageLink: {type: String, comment: '封面地址'}
        }
    ],
    peoples: [
        {
            _id: false,
            id: {type: String, comment: 'id'},
            name: {type: String, comment: '标题'},
            poster_path: {type: String, comment: '封面'}
        }
    ],
    sports: [
        {
            _id: false,
            id: {type: Schema.Types.ObjectId, comment: 'id'},
            name: {type: String, comment: '运动名称'}
        }
    ],
    //todo
    facebook: {type: String, comment: '账号'},
    //todo
    instagram: {type: String, comment: '账号'},
    // comment: "交友要求",
    requirements: {
        gender: {type: Number, comment: '性别'},// 1Male 2Female 3Any
        bodyType: {type: Number, comment: '身材'},
        ethnicity: {type: Number, comment: '种族'},
        children: {type: Number, comment: '孩子情况'},
        relationship: {type: Number, comment: '社会关系'},
        smoke: {type: Number, comment: '吸烟'},
        drink: {type: Number, comment: '喝酒'},
        religion: {type: Number, comment: '宗教'},
        education: {type: Number, comment: '教育情况'},
        workin: {type: Number, comment: '工作情况'},
        income: {type: Number, comment: '收入情况'},
        height: {type: Number, comment: '单位 cm'},
        weight: {type: Number, comment: '单位 kg'},
        ageMin: {type: Number, comment: '年龄范围小值'},
        ageMax: {type: Number, comment: '年龄范围大值'},
    },
    // 好友
    friends: {type: [Schema.Types.ObjectId]}
});

users.virtual('genderStr').get(function () {
    return util.isEmpty(this.gender) ? '' : userDesc.gender[this.gender];
});
users.virtual('bodyTypeStr').get(function () {
    return util.isEmpty(this.bodyType) ? '' : userDesc.bodyType[this.bodyType];
});
users.virtual('ethnicityStr').get(function () {
    return util.isEmpty(this.ethnicity) ? '' : userDesc.ethnicity[this.ethnicity];
});
users.virtual('childrenStr').get(function () {
    return util.isEmpty(this.children) ? '' : userDesc.children[this.children];
});
users.virtual('relationshipStr').get(function () {
    return util.isEmpty(this.relationship) ? '' : userDesc.relationship[this.relationship];
});
users.virtual('smokeStr').get(function () {
    return util.isEmpty(this.smoke) ? '' : userDesc.smoke[this.smoke];
});
users.virtual('drinkStr').get(function () {
    return util.isEmpty(this.drink) ? '' : userDesc.drink[this.drink];
});
users.virtual('religionStr').get(function () {
    return util.isEmpty(this.religion) ? '' : userDesc.religion[this.religion];
});
users.virtual('educationStr').get(function () {
    return util.isEmpty(this.education) ? '' : userDesc.education[this.education];
});
users.virtual('workinStr').get(function () {
    return util.isEmpty(this.workin) ? '' : userDesc.workin[this.workin];
});
users.virtual('incomeStr').get(function () {
    return util.isEmpty(this.income) ? '' : userDesc.income[this.income];
});
users.virtual('phoneVerified').get(function () {
    return util.isEmpty(this.mobile) ? false : true;
});
module.exports = model('users', users);