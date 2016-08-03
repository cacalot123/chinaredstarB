/**
 * 列表
 **/
define('js/element/view/list-box', [
        'text!js/element/template/list-box.tpl'
    ],
    function(ListTpl, Cache, AlertUI) {
        var loadingEnable = true; //分页加载锁,默认可加载
        var LayoutView = Backbone.View.extend({
            events: {

            },
            //
            initialize: function(options, config, events) {
                var t = this;
                t.config = config || {};
                t.events = events || {
                    loadData: function() {

                    },
                    appendItem: function(data) {
                        console.log(data);
                    }
                };
                t.config.page = t.config.page || 1;
                t.render();
                // t.events.loadData(t.config.page, function(data, currentPage, totalPages) {
                //     console.log(data);
                //     console.log(currentPage);
                //     console.log(totalPages);
                //     t.setCurrentPage(currentPage);
                //     t.setTotalPage(totalPages);
                //     var item_templates = '';
                //     if (t.config.page > 1) {
                //         item_templates = t.$el.find('#scroller').html();
                //     }
                //     if (data && data.length > 0) {
                //         $.each(data, function(i, item) {
                //             var item_template = t.events.appendItem(item);
                //             // t.$el.append(item_template);
                //             item_templates = item_templates + item_template;
                //         });
                //     }
                //     t.$el.html(item_templates);
                //     loadingEnable = true;
                // });
                t.loadData();
                //初始化下拉刷新
                if (t.config.scroll) {
                    t._initScroll();
                }
            },
            render: function() {
                var t = this;
                t.$el.append(tpl(ListTpl, {
                    data: t.config
                }));
            },
            loadData: function() {
                var t = this;
                if (loadingEnable) {
                    //放置加载中标记
                    $('#scroller').find('.page-end').remove();
                    t.$el.find('#scroller .scrollBox').append('<div class="page-end">加载中...</div>');
                }
                t.events.loadData(t.config.page, function(data, currentPage, totalPages) {
                    /*console.log(data);
                    console.log(currentPage);
                    console.log(totalPages);*/
                    t.setCurrentPage(currentPage);
                    t.setTotalPage(totalPages);
                    var item_templates = '';
                    if (t.config.page > 1) {
                        item_templates = t.$el.find('#scroller .scrollBox').html();
                    }
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            var item_template = t.events.appendItem(item, i);
                            // t.$el.append(item_template);
                            item_templates = item_templates + item_template;
                        });
                    }
                    t.$el.find('#scroller .scrollBox').html(item_templates);
                    loadingEnable = true;

                    if (loadingEnable) {
                        $('#scroller').find('.page-end').remove();
                        var _tmp_page = t.config.page + 1;
                        if (_tmp_page <= t.config.totalPage) {
                            //还有下一页可以加载
                            //console.log('还有下一页可以加载');
                            t.$el.find('#scroller .scrollBox').append('<div class="page-end">下拉加载更多</div>');
                        } else {
                            //到头了
                            var windowHeight = $(window).height(),
                                scrollHeight = $("#scroller .scrollBox").height(),
                                scrollOffset = $("#scroller .scrollBox").offset().top;
                            if (scrollHeight > (windowHeight - scrollOffset)) {
                                //console.log('到头了');
                                t.$el.find('#scroller .scrollBox').append('<div class="page-end">已经到底啦</div>');
                            }
                        }
                    }

                });
            },
            clearItem: function() {
                var t = this;
                t.$el.find('#scroller .scrollBox').html('');
            },
            setCurrentPage: function(page) {
                var t = this;
                t.config.page = page;
            },
            setTotalPage: function(page) {
                var t = this;
                t.config.totalPage = page;
            },
            _initScroll: function() {
                var t = this;
                $(window).scroll(function() {
                    var x1 = $(window).scrollTop();
                    var x2 = $('.scrollBox').height() - (window.screen.height * 2 - $('#header-container').height()); //因为屏幕是缩放了0.5的，屏幕高度应该是原长度的两倍
                    if (x1 > x2 && loadingEnable) {
                        // loadingEnable = false;
                        t._pullUpAction();
                        //console.log('可以翻页了');
                    } else {
                        // console.log('x1', x1);
                        //console.log('x2', x2);
                    }
                });
            },
            _pullUpAction: function() {
                var t = this;
                //console.log('加载下一页');
                t.config.page = t.config.page + 1;
                if (t.config.page <= t.config.totalPage) {
                    t.loadData();
                } else {
                    //console.log('没有什么可以加载的了');

                }
            },
        });
        return LayoutView;
    });