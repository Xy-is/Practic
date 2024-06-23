package com.example.pract.api.model;

import java.util.Arrays;
import java.util.List;

public enum Role {

    USER(Arrays.asList()),

    EMPLOYEE(Arrays.asList(Permission.READ_PROJECT, Permission.CHANGE_TASK, Permission.READ_TASK)),

    MANAGER(Arrays.asList(Permission.READ_EMPLOYEE, Permission.CHANGE_TASK, Permission.READ_TASK, Permission.CHANGE_PROJECT, Permission.READ_PROJECT)),

    ADMIN(Arrays.asList(Permission.READ_EMPLOYEE, Permission.READ_DEPARTMENT, Permission.READ_PROJECT, Permission.READ_TASK, Permission.CHANGE_EMPLOYEE, Permission.CHANGE_DEPARTMENT, Permission.CHANGE_PROJECT, Permission.CHANGE_TASK));

    private List<Permission> permissions;

    Role(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}