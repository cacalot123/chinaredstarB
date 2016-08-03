<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="java.util.HashMap" %>
<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <%
        WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
        HashMap systemConfig = (HashMap) context.getBean("systemConfig");
    %>
    <meta name="description" content="">
    <title>龙眼 1.0</title>
    <meta name="HandheldFriendly" content="True">
    <%--<meta name="viewport"--%>
          <%--content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui">--%>
    <meta name="viewport" content="target-densitydpi=device-dpi,width=device-width,initial-scale=0.5, minimum-scale=0.5, maximum-scale=1.0, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>

    <SCRIPT LANGUAGE="javascript">
        window.resource = {
            image: '<%=systemConfig.get("staticMWebUrl")%>/img',
            upload:'/s'
        }
    </SCRIPT>
    <!-- <link href="static_longyan_app/css/app.uncompressed.css" rel="stylesheet">-->

    <!-- build:css static_longyan_app/build/css/longyan-1.0.0.min-->
    <link rel="stylesheet"
          href="<%=systemConfig.get("staticMWebUrl")%>/css/element.css">
    <link rel="stylesheet"
          href="<%=systemConfig.get("staticMWebUrl")%>/css/main.css">
    <link rel="stylesheet"
          href="<%=systemConfig.get("staticMWebUrl")%>/css/demo.css">
    <link rel="stylesheet"
          href="<%=systemConfig.get("staticMWebUrl")%>/css/iconfont.css">
    <link rel="stylesheet"
          href="<%=systemConfig.get("staticMWebUrl")%>/css/picker.css">

    <!-- endbuild -->
    <!-- build:js static_longyan_app/build/js/longyan-1.0.0.min -->
		<script src="<%=systemConfig.get("staticMWebUrl")%>/nvwa-loader-1.7.0.js"
		    api=""
            baseUrl="js"
            skin=""
            debug="true"
            lang="zh_CN"
            jsonp="true"
            preload="bootstrap.min,jquery.ui.widget,fileUpload"></script>

 <!-- endbuild -->
    <style type="text/css">
        @font-face {font-family: "iconfont";
            src: url('/static_m_web/fonts/iconfont.eot?t=1463673438'); /* IE9*/
            src: url('/static_m_web/fonts/iconfont.eot?t=1463673438#iefix') format('embedded-opentype'), /* IE6-IE8 */
            url('/static_m_web/fonts/iconfont.woff?t=1463673438') format('woff'), /* chrome, firefox */
            url('/static_m_web/fonts/iconfont.ttf?t=1463673438') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
            url('/static_m_web/fonts/iconfont.svg?t=1463673438#iconfont') format('svg'); /* iOS 4.1- */
        }
        @font-face {
            font-family: 'FontAwesome';
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: "Ionicons";
            font-weight: normal;
            font-style: normal;
        }

    </style>
</head>

<body class="wechat-client pageContainer">
<div style="position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;background-color: #777;">
    <span>系统载入中......</span>
</div>

</body>

</html>
