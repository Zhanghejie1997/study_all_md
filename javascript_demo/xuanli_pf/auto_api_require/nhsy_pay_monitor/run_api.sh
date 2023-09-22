#! /bin/bash
num=`ps -ef | grep 'node4 api.js' | grep -v grep | wc -l`

if [ $num -gt 0 ]; then
    pid=`ps -ef | grep 'node4 api.js' | grep -v grep | awk '{print $2}'`

    for i in $pid
    do
        kill -9 $pid
        echo 'stop' $pid '[ ok ]'
    done
fi

node4 api.js >> /home/hxddz_pay_monitor_api.log 2>&1 &
echo 'start api [ ok ]'