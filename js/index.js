//定义元素的个数
let len = 5 * 5 * 5 - 5;
let oUl = document.getElementById('list').firstElementChild;
//定义存放按钮的数组
let oBtns = [table, roll, ball, grid]
    //定义所有的li
let oLis;
//定义鼠标是否移动过
let isMove = false;
(function() {
    //创建125个li元素
    for (let i = 0; i < len; i++) {
        //没有数据就默认等于第一个数据
        date[i] = date[i] || date[0]
        let oLi = document.createElement('li');
        oLi.innerHTML = `<b class="cover"></b>
    <p class="title">${date[i].type}</p>
    <p class="author">${date[i].author}</p>
    <p class="time">${date[i].eglish}</p>
    <p class="time">${date[i].time}</p>`;
        //给每个li加索引
        oLi.index = i;
        //给每个li加坐标
        oLi.x = (i) % 5 - 2;
        oLi.y = parseInt((i % 25) / 5) - 2;
        oLi.z = -parseInt(i / 25) + 2;
        //给每个li随机位置

        let tx = Math.random() * 4000 - 2000;
        let ty = Math.random() * 4000 - 2000;
        let tz = Math.random() * 4000 - 2000;
        oLi.style.transform = `translate3d(${tx}px,${ty}px,${tz}px)`;
        oUl.appendChild(oLi);
    }
    //获取所有的li
    oLis = oUl.getElementsByTagName('li');
    //初始化li，默认形成平铺
    setTimeout(table, 0);
})();
//网格函数
function grid() {
    for (let i = 0; i < len; i++) {
        oLis[i].style.transform = `translate3d(${oLis[i].x * 350}px,${oLis[i].y * 350}px,${oLis[i].z * 500}px)`;
    }
}
//平铺函数
function table() {
    //定义两系金属向下移动的距离
    let oTop = 100;
    for (let i = 0; i < 56; i++) {
        oLis[i].style.transform = `translate3d(${tableData[i][0] * 124}px,${tableData[i][1] * 164}px,0px)`;
    }
    for (let i = 56; i < 71; i++) {
        oLis[i].style.transform = `translate3d(${tableData[i + 34][0] * 124}px,${tableData[i + 34][1] * 164 + oTop}px,0px)`;
    }
    for (let i = 71; i < 88; i++) {
        oLis[i].style.transform = `translate3d(${tableData[i - 14][0] * 124}px,${tableData[i - 14][1] * 164}px,0px)`;
    }
    for (let i = 88; i < 103; i++) {
        oLis[i].style.transform = `translate3d(${tableData[i + 17][0] * 124}px,${tableData[i + 17][1] * 164 + oTop}px,0px)`;
    }
    for (let i = 103; i < 118; i++) {
        oLis[i].style.transform = `translate3d(${tableData[i - 28][0] * 124}px,${tableData[i - 28][1] * 164}px,0px)`;
    }
    oLis[118].style.transform = `translate3d(${tableData[56][0] * 124}px,${tableData[56][1] * 164}px,0px)`;
    oLis[118].innerHTML = `<b class="cover"></b>
    <p class="title">${'57-71'}</p>
    <p class="author">${'镧系'}</p>
    <p class="time">${'lanthanoids'}</p>`;
    oLis[119].style.transform = `translate3d(${tableData[74][0] * 124}px,${tableData[74][1] * 164}px,0px)`;
    oLis[119].innerHTML = `<b class="cover"></b>
    <p class="title">${'89-103'}</p>
    <p class="author">${'锕系'}</p>
    <p class="time">${'actinoids'}</p>`;
}
//相反数函数（为了实现切换时的旋转效果）
function opposite() {
    return (parseInt(Math.random() * 6) - 3) * 360
}
//球体函数
function ball() {
    //存放层数数据
    let level = [1, 6, 10, 15, 18, 20, 18, 15, 10, 6, 1];
    let degX = 90 + opposite();
    let degY;
    let num = 0;
    //每层绕x旋转
    for (let i = 0; i < level.length; i++) {
        degY = 0 + opposite();
        for (let j = 0; j < level[i]; j++) {
            oLis[num].style.transform = ` rotateY(${degY}deg) rotateX(${degX}deg)  translateZ(900px) `;
            num++;
            //一圈360
            degY += 360 / level[i];
        }
        degX -= (180 / 10);
    }
}
//螺旋函数
function roll() {
    let level = [40, 40, 40];
    let oTrsY = -650;
    let degY;
    let num = 0;
    //每层绕x旋转
    for (let i = 0; i < level.length; i++) {
        degY = 0 + opposite();
        for (let j = 0; j < level[i]; j++) {
            oLis[num].style.transform = ` rotateY(${degY}deg) translateY(${oTrsY}px)  translateZ(${144 * 40 / 3.1415 / 2}px) `;
            num++;
            oTrsY += 10;
            //一圈360
            degY += 360 / level[i];
        }
    }
}
//定义切换按钮
(function() {
    let oUlBtn = document.getElementById('btn').children[0];
    let oBtn = document.getElementById('btn').children[0].children;
    let index = 0;
    oBtn[index].style.background = 'rgba(0, 127, 127, 0.8)';
    let time,
        _Time = 0;
    let isauto = true;
    for (let i = 0; i < oBtn.length; i++) {
        // oBtn[i].style.background = 'null'
        oBtn[i].onclick = function() {
            oBtn[index].style.background = '';
            index = i;
            oBtns[i]();
            oBtn[i].style.background = 'rgba(0, 127, 127, 0.8)';
        };
    }
    //以下这些代码是重点了，自动轮播切换实现，监听鼠标事件，只要鼠标一动自动轮播停止，然后监听鼠标静止时间，时间超过
    // 五秒钟接着进行轮播。
    setTimeout(() => {
        time = setInterval(function() {
            oBtn[index].style.background = '';
            index++;
            if (index > 3) { index = 0 };
            oBtns[index]();
            oBtn[index].style.background = 'rgba(0, 127, 127, 0.8)';
        }, 5000);
    }, 3500);
    window.onmousemove = function() {
        window.oLastTime = new Date().getTime();
        clearInterval(time);
        isauto = false;
    }
    setInterval(() => {
        window.oLastTime = window.oLastTime || 0;
        let newTime = new Date().getTime();
        _Time = newTime - window.oLastTime;
        if (_Time > 3000 && isauto == false) {
            time = setInterval(function() {
                console.log(222);
                oBtn[index].style.background = '';
                index++;
                if (index > 3) { index = 0 };
                oBtns[index]();
                oBtn[index].style.background = 'rgba(0, 127, 127, 0.8)';
            }, 5000);
            isauto = true;
        }
    }, 1000);
})();
//鼠标拖拽效果
(function() {
    //记录按下时的位置
    let x, y;
    //记录最后的步长
    let stepX = 0,
        stepY = 0;
    //记录移动的距离
    let x_ = 0,
        y_ = 0;
    //记录景深
    let tz = -2000;
    document.onmousedown = function(ev) {
        x = ev.screenX;
        y = ev.screenY;
        document.onmousemove = function(ev) {
            x_ += (ev.screenX - x);
            y_ += (ev.screenY - y);
            stepX = ev.screenX - x;
            stepY = ev.screenY - y
            oUl.style.transform = `translateZ(${tz}px) rotateY(${x_ / 10}deg) rotateX(${-y_ / 10}deg) `;
            x = ev.screenX;
            y = ev.screenY;
            isMove = true;
        }
    };
    document.onmouseup = function() {
        //这里要定义缓冲的动画，需要根据步长判断使用者鼠标滑动的速度，只有速度快的时候才提供缓冲
        //这里的判定要用||，有可能只动一个方向
        if (Math.abs(stepY) > 5 || Math.abs(stepX) > 5) {
            ani()
        }
        document.onmousemove = null;
    };
    //缓冲动画，这里用定时器来做
    function ani() {
        let timeOut = setInterval(function() {
            stepX *= 0.9;
            stepY *= 0.9;
            x_ = stepX + x_;
            y_ = stepY + y_;
            oUl.style.transform = `translateZ(${tz}px) rotateY(${x_ / 10}deg) rotateX(${-y_ / 10}deg) `;
            //步长太小就不会动了，就结束
            //这里的判定要用&&，有可能只动一个方向
            if (Math.abs(stepY) < 0.1 && Math.abs(stepX) < 0.1) {
                clearInterval(timeOut)
            }
            //60帧
        }, 16.6);
    }
    //滚轮效果
    (function mouseRoll() {
        document.onmousewheel = function(ev) {
            //浏览器兼容
            if (document.onmousewheel === undefined) {
                alert("请用chrome浏览器打开以查看效果")
            } else {
                if (ev.wheelDelta > 0) {
                    tz += 100;
                } else {
                    tz -= 100;
                }
                oUl.style.transform = `translateZ(${tz}px) rotateY(${x_ / 10}deg) rotateX(${-y_ / 10}deg) `;
            }
        }
    })();
})();
//弹窗
(function() {
    let oAlert = document.getElementById('alert'),
        oAll = document.getElementById('all'),
        oTitle = oAlert.getElementsByClassName('title')[0].children[0],
        oImg = oAlert.getElementsByClassName('img')[0].children[0],
        oAuthor = oAlert.getElementsByClassName('author')[0].children[0],
        oInfo = oAlert.getElementsByClassName('info')[0].children[0];
    let oTarget, index;
    let isAlert = false;
    let back = document.getElementById("back");
    //定义数组，用来存放当前li的transform3d信息
    let oTransform3d = [];
    oUl.onclick = function(ev) {
        ev = ev || window.ev;
        oTarget = ev.target.parentNode;
        index = ev.target.parentNode.index;
        if (index == undefined || isMove == true) {
            isMove = false;
            return;
        } else {
            oTitle.innerHTML = `${date[index].title}`;
            oImg.src = `./img/${date[index].author}.jpg`;
            oAuthor.innerHTML = `${date[index].author}`;
            oInfo.innerHTML = `${date[index].desc}`;
            oAlert.style.transform = `rotateY(0deg) scale(2)`
            oAlert.style.display = 'block';
            isAlert = true;

            setTimeout(function() {
                oAlert.style.opacity = 1;
                oAlert.style.transform = `rotateY(0deg) scale(1)`
            }, 0)

        }
        //阻止事件冒泡的IE兼容
        ev.stopPropagation == undefined ? ev.cancelBubble = true : ev.stopPropagation();
    }
    document.getElementById('all').onclick = function() {
        if (isAlert = false) {
            return
        } else {
            oAlert.style.opacity = 0;
            oAlert.style.transform = `rotateY(360deg) scale(0.1)`
            setTimeout(function() {
                oAlert.style.display = 'none'
            }, 500)
        }

        // oAlert.style.display = 'none';
    }
    oAlert.onclick = function(ev) {
        oAll.className = 'left';
        document.getElementById('frame').src = `./src/3D Drag/index.html`
        ev.stopPropagation == undefined ? ev.cancelBubble = true : ev.stopPropagation();
    }
    back.onclick = function() {
        oAll.className = '';
    }


})();