package com.chinaredstar.longyan.interceptor;

import com.xiwa.base.util.DataUtil;
import com.xiwa.base.util.RandomGUIDUtil;
import com.xiwa.base.util.StringUtil;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by niu on 2016/5/5.
 */

/**
 * 登陆持久化拦截器
 */
public class LogSpringInterceptor implements HandlerInterceptor {

    protected static Logger logger = Logger.getLogger(LogSpringInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        /**
         * preHandle方法是进行处理器拦截用的，顾名思义，该方法将在Controller处理之前进行调用，SpringMVC中的Interceptor拦截器是链式的，可以同时存在
         * 多个Interceptor，然后SpringMVC会根据声明的前后顺序一个接一个的执行，而且所有的Interceptor中的preHandle方法都会在
         * Controller方法调用之前调用。SpringMVC的这种Interceptor链式结构也是可以进行中断的，这种中断方式是令preHandle的返
         * 回值为false，当preHandle的返回值为false的时候整个请求就结束了。
         */
        long t1 = System.currentTimeMillis();
        String GUID = RandomGUIDUtil.getRawGUID();
        httpServletRequest.setAttribute("startTime", t1);
        httpServletRequest.setAttribute("GUID", GUID);
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("[request][").append(httpServletRequest.getRequestURI()).append("][").append(JSONObject.fromObject(httpServletRequest.getParameterMap()).toString()).append("][").append(GUID).append("]");
        logger.info(stringBuffer.toString());

        return true;
    }

    /**
     * 这个方法只会在当前这个Interceptor的preHandle方法返回值为true的时候才会执行。postHandle是进行处理器拦截用的，它的执行时间是在处理器进行处理之
     * 后，也就是在Controller的方法调用之后执行，但是它会在DispatcherServlet进行视图的渲染之前执行，也就是说在这个方法中你可以对ModelAndView进行操
     * 作。这个方法的链式结构跟正常访问的方向是相反的，也就是说先声明的Interceptor拦截器该方法反而会后调用，这跟Struts2里面的拦截器的执行过程有点像，
     * 只是Struts2里面的intercept方法中要手动的调用ActionInvocation的invoke方法，Struts2中调用ActionInvocation的invoke方法就是调用下一个Interceptor
     * 或者是调用action，然后要在Interceptor之前调用的内容都写在调用invoke之前，要在Interceptor之后调用的内容都写在调用invoke方法之后。
     */
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        Object startTimeObj = httpServletRequest.getAttribute("startTime");
        Object guidObj = httpServletRequest.getAttribute("GUID");
        if (startTimeObj != null) {
            long t2 = System.currentTimeMillis();
            long t1 = DataUtil.getLong(startTimeObj, 0);
            long t3 = t2 - t1;
            String GUID = StringUtil.getString(guidObj, RandomGUIDUtil.getRawGUID());
            StringBuffer stringBuffer = new StringBuffer();
            stringBuffer.append("[execute_time][").append(httpServletRequest.getRequestURI()).append("][").append(t3).append("ms][").append(GUID).append("]");
            logger.info(stringBuffer.toString());
        }
    }

    /**
     * 该方法也是需要当前对应的Interceptor的preHandle方法的返回值为true时才会执行。该方法将在整个请求完成之后，也就是DispatcherServlet渲染了视图执行，
     * 这个方法的主要作用是用于清理资源的，当然这个方法也只能在当前这个Interceptor的preHandle方法的返回值为true时才会执行。
     */
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public static void writeJSON(HttpServletResponse response, String jsonString) throws IOException {
        try {
            response.setContentType("application/json");
            response.getOutputStream().write(jsonString.getBytes("UTF-8"));
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (IOException e) {

        }
    }

    public static void writeJSON(HttpServletResponse response, Object o) throws IOException {
        writeJSON(response, JSONObject.fromObject(o).toString());
    }

    public static boolean isMatch(ServletRequest request, List<String> patternList) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String requestURI = httpServletRequest.getRequestURI();
        for (String pattern : patternList) {
            if (Pattern.compile(pattern).matcher(requestURI).matches()) {
                return true;
            }
        }
        return false;
    }
}
