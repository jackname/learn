//取样式并设置样式 用法：getStyle(d, 'width','200px');
function getStyle(obj,name,value){  
	if(arguments.length==2){ 
		if(obj.currentStyle)
		{
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj,false)[name];
		}	
	}else{
		return obj.style[name]=value;
	}
}

//运动效果
function startMove(obj, json, fnEnd)  
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
				bStop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}

//阻止冒泡事件
/*
var oEvent = ev||event;
oEvent.cancelBubble=true;
*/


 //用class取节点
function getByClass(oParent, sClass)   
{
	var aResult=[];
	var aEle=oParent.getElementsByTagName('*');
	
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}