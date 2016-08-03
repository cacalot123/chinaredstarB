/**
 * Router
 * @return {[type]} [description]
 */
define('router', ['js/modules/view/layout'], function(LayoutView) {
    var Router = Backbone.Router.extend({
        routes: {
            //首页
            "": "index",
            "test": "test"
        },

        //初始化布局
        initialize: function() {
            // this._init();
        },
        pageStack: {},
        removeView: function() {
            var t = this;
            // if (!!t.pageStack) {
            //     for (var item in t.pageStack) {
            //         t.pageStack[item].remove();
            //         // t.pageStack[item].stopListening();
            //     }
            // }
            if (t.indexView && t.indexView.destroy) {
                //销毁
                t.indexView.destroy();
            }
        },
        changePage: function(view_id, config) {
            var t = this;
            config = config || {};
            t.removeView();
            requirejs(["js/modules/view/" + view_id], function(IndexView) {
                var container = document.body;
                t.indexView = new IndexView({
                    el: container,
                    routes: t
                }, config, {}, null, false);
                t.pageStack[view_id] = t.indexView;
            });
        },
        //index
        index: function() {
            var t = this;
            t.removeView();
            // t._init();
            // $('#pg_box') && $('#pg_box').remove();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/longyan/view/index"], function(IndexView) {
                //list oi
                var container = document.body;
                t.indexView = new IndexView({
                    el: container,
                    routes: t
                }, {}, {}, null, false);
                t.pageStack['index'] = t.indexView;
            });
        },
        //test
        test: function() {
            var t = this;
            t.changePage('test');
        },
        _isPC: function() {
            var t = this;
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"
            ];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0 || t._isWeixin()) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        _isWeixin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
    });
    return Router;
});