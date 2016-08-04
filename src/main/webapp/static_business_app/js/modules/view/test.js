/**
 *home view
 *首页
 **/
define('js/modules/view/test', [
        'text!js/modules/template/test.tpl',
        'js/util/memory_cache',
        'js/components/alert_ui'
    ],
    function(IndexTpl, Cache, AlertUI) {
        var tipsAlert = tipsAlert || new AlertUI();

        var LayoutView = Backbone.View.extend({
            events: {

            },
            //
            initialize: function(options, config) {

                var t = this;
                t.$el.off('click');
                t.render();

                t.loadData();
                t.initEvents();
            },
            render: function() {
                var t = this;
                t.$el.html(tpl(IndexTpl, {}));
            },
            initEvents: function() {
                var t = this;

            },
            //加载数据
            loadData: function() {
                var t = this;
            }

        });
        return LayoutView;
    });