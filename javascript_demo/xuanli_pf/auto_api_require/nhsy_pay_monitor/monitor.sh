#! /bin/bash
case $1 in
    start)
        num=`ps -ef | grep 'node4 appnhsy.js' | grep -v grep | wc -l`
        if [ $num -gt 0 ]; then
            echo '已经开启'
        else
            node4 appnhsy.js > /home/nhsy_pay_monitor.log 2>&1 &
            num2=`ps -ef | grep 'node4 appnhsy.js' | grep -v grep | wc -l`
            if [ $num2 -gt 0 ]; then
                echo 'start [ ok ]'
            else
                echo 'start [ faild ]'
            fi
        fi
    	;;
    stop)
		num=`ps -ef | grep 'node4 appnhsy.js' | grep -v grep | wc -l`
        if [ $num -gt 0 ]; then
            pid=`ps -ef | grep 'node4 appnhsy.js' | grep -v grep | awk '{print $2}'`

            for i in $pid
            do
                kill -9 $pid
                echo 'stop pid:' $pid '[ ok ]'
            done
        else
            echo '已经关闭'
        fi
    	;;
	*)
		echo 'usage ./monitor.sh start|stop'
esac
