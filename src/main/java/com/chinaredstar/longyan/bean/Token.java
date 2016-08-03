package com.chinaredstar.longyan.bean;

import com.xiwa.base.bean.Identified;

import java.util.Date;

/**
 * 令牌
 * Created by bingcheng on 2015/4/2.
 */
public class Token implements Identified {

    private int id;

    private  String remark;//备注

    private  boolean active;//激活状态

    private  String token;//令牌值

    private Date createDate;//创建时间

    private  Date updateDate;//更新时间

    @Override
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
