## 拖拽

name|types|default
---|:--:|---:
tag|string|div
Option|object|必填
dragClassName|string|dragWarp
dragStyle|object|{}
dropClassName|string|dropWarp
dropStyle|object|{}
defaultValue|Array|[]
onChange|fun|data


## Option
- dragWarp 

name|types|default
---|:--:|---:
dragData|Array|[]
classNames|string|''
styles|object|{}
render|fun|必传


### page
- render 渲染选择框数据，返回data自行打印查看
- dragData 为空不展示
- styles 修改选择框样式
- classNames 添加类名

********************
- dropWarp

name|types|default
---|:--:|---:
dragData|Array|[]
classNames|string|''
styles|object|{}
render|fun|必传

### page
- render 渲染选择框数据，返回data自行打印查看
- dragData 为空不展示
- styles 修改选择框样式
- classNames 添加类名
