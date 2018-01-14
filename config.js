/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '81636833.helloxcx.xyz';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `https://${host}/login`,

        getGifUrl: `https://${host}/getGifUrls`,
    },

    support: {
      zhihu: '#1371E6',
      matrix67: '#000000',
      songshuhui: '#F7AC30',
      ifanr: '#DB2B23',
      '36kr': '#346EF3',
      coolshell:'#162022'
    }
};

module.exports = config;