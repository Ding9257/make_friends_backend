const util = require('./../lib/utils/utils');
const {Schema, model} = require('mongoose');

const users = new Schema({
    // _id
    createAt: {type: Date, default: new Date(), comment: '创建时间'},
    updateAt: {type: Date, comment: '更新时间'},
    status: {type: Number, default: 0, comment: '-1无效 0 有效'},

    weChatId: {type: String, comment: '微信号'},
    appId: {type: String, comment: '微信用户id'},
    nickName: {type: String, comment: '昵称'},
    mobile: {type: String, comment: '手机号'},
    birthday: {type: String, comment: '生日'},
    prov: {type: Number, comment: '省code'},
    city: {type: Number, comment: '城市code'},
    gender: {type: Number, comment: '性别 1: 男 2 女'},
    avatar: {type: String, comment: '头像'},
    photoWall: {type: [String], comment: '照片'},
    height: {type: Number, comment: '身高 cm'},
    weight: {type: Number, comment: '体重 KG'},

    certId: {type: String, comment: "身份证"},
    name: {type: String, comment: "姓名"},

    income: {
        type: Number, default: 0,
        comment: '收入范围  0未选择, 1 3000以下, 2 3000~5000, 3 5000~10000", 4 10000~20000, 5 20000~30000,6 30000以上'
    },
    education: {type: Number, default: 0, comment: '学历 0未选择, 1高中及以下, 2中专, 3大专, 4大学本科, 5硕士, 6博士, 7海归'},
    relationship: {type: Number, default: 0, comment: '婚姻状况 0 未选择, 1单身, 2恋爱中, 2已订婚, 3已婚, 4分居, 5离异, 6丧偶'},
    workin: {type: Number, default: 0, comment: '工作 0未选择, 1公务员, 2事业单位, 3国企, 4企业职员, 5自由职业 6个体户, 7其他'},
    selfIntro: {type: String, comment: '自我介绍'},


    membership: {type: Boolean, default: false, comment: '是否付费会员 default false'},
    autoPay: {type: Boolean, default: false, comment: '付费会员是否自动扣款 default false'},
    memberExpireTime: {type: Date, comment: '会员过期时间'},
    // comment: "交友要求",
    requirements: {
        education: {type: Number, comment: '教育情况'},
        prov: {type: Number, comment: '省code'},
        city: {type: Number, comment: '城市code'},
        income: {type: Number, comment: '收入情况'},
        height: {
            min: {type: Number, comment: '身高范围小值'},
            max: {type: Number, comment: '身高范围大值'}
        },
        age: {
            min: {type: Number, comment: '年龄范围小值'},
            max: {type: Number, comment: '年龄范围大值'}
        },
        relationship: {type: Number, comment: '婚姻状态'}
    },
    // 好友
    friends: {type: [Schema.Types.ObjectId]}
});
module.exports = model('users', users);