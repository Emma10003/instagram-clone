package com.instagram.common.aop;

import org.aspectj.lang.annotation.Pointcut;

public class PointcutBundle {

    @Pointcut("execution(* com.instagram..*Controller*.*(..))")
    public void controllerPointCut(){}

    @Pointcut("execution(* com.instagram..*ServiceImpl*.*(..))")
    public void serviceImplPointCut(){}
}
