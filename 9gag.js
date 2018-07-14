var request = require('request');

function replaceMessage(message, data)
{
    message.reply(data.video)
        .then(sent => message.delete()
            .then()
            .catch(console.error))
        .catch(console.error);

}

function get9GagVideoURL(message, data)
{
    request({
        uri: data.video,
        method: 'GET',
    }, function (err, res, html) {
        console.log(res.statusCode);
        if (err || res.statusCode != 200) {
            return false;
        }
        console.log("video confirmed in " + data.video);
        replaceMessage(message, data);
        return true;
    });
}

function contains9GagVideo(message, data)
{
    const regex = /.*https:\/\/9gag\.com\/gag\/(\w+)/;
    const match = regex.exec(message.content);
    if (match == null || match[1] == "")
        return false;
    data.id = match[1];
    data.url = "https://9gag.com/gag/" + match[1];
    data.video = "https://img-9gag-fun.9cache.com/photo/" + data.id + "_460svvp9.webm";
    return true;
}

function replace9GagVideo(message) {
    var data = {    url: "",
                    id: "",
                    video: ""};

    if (!contains9GagVideo(message, data))
        return false;

    return get9GagVideoURL(message, data);
}

module.exports = {replace9GagVideo}