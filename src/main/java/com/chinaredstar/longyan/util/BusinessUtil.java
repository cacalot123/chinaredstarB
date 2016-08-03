package com.chinaredstar.longyan.util;

import com.xiwa.base.pipeline.PipelineException;
import com.xiwa.base.util.StringUtil;
import net.sf.json.JSONObject;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;
import java.util.*;

/**
 * @author XueChao.Zhang
 * @version 1.00 14-7-23 下午2:24
 */
public class BusinessUtil {

    /**
     * 可以根据 "xxx.xxx.xxx" 的形式获取Map对象
     * 递归调用
     *
     * @param key
     * @param objectMap
     * @return
     * @throws com.xiwa.base.pipeline.PipelineException
     */
    public static Object getMapValue(String key, Map<String, Object> objectMap) throws PipelineException {
        JSONObject objectJsonMap = JSONObject.fromObject(objectMap);
        if (StringUtil.isValid(key)) {
            String[] keys = key.split("\\.");
            if (objectJsonMap.containsKey(keys[0])) {
                if (keys.length == 1) {
                    return objectJsonMap.get(keys[0]);
                } else {
                    return getMapValue(key.substring(key.indexOf(".") + 1, key.length()), (Map<String, Object>) objectJsonMap.get(keys[0]));
                }
            } else {
                throw new PipelineException("no key in hashMap,key=" + key);
            }
        } else {
            return null;
        }
    }

    /**
     * 获取WebApplicationContext对象
     *
     * @return
     */
    public static WebApplicationContext getWebApplicationContext() {
        ServletContext sc = (((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()).getSession().getServletContext();
        WebApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(sc);
        return applicationContext;
    }

}
