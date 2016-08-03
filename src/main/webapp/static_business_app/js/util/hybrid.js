/**
 * hybrid 对接方法
 * @return {[type]} [description]
 */
define('js/util/hybrid', [], function() {
    _app_callback = function(uuid, response) {
        var handler = window.App[uuid];
        if (handler) {
            handler(response);
        }
    }
    window.App = {
        call: function(uuid, action, data, handler) {
            window.App[uuid] = handler;
        },
        handler: function(uuid, data) {
            var response = window.App[uuid];
            if (response) {
                response();
            }
        }
    }
    $nvwa.app = {
        /*
         * action:表示需要执行功能的枚举，比如:http请求
         * data: 执行的参数
         * handler:app执行完后调用的回调函数
         */
        request: function(action, request, responseHandler) {
            var uuid = $nvwa.string.randomSN();
            if (responseHandler) {
                window.App[uuid] = responseHandler;
            }
            _app_call(uuid, action, $nvwa.string.objectToJsonString(request));
        }
    };
    return $nvwa.app;
});