这是一个问题反馈[unicloud-admin](https://uniapp.dcloud.io/uniCloud/admin?id=%e4%bb%80%e4%b9%88%e6%98%af-unicloud-admin)插件，用户端插件：[https://ext.dcloud.net.cn/plugin?id=50](https://ext.dcloud.net.cn/plugin?id=50)

> 本插件是一个schema2code的案例，你也可以自己尝试通过掌握[schema2code](https://uniapp.dcloud.io/uniCloud/schema?id=autocode)与[admin 插件开发指南](https://uniapp.dcloud.io/uniCloud/admin?id=admin-%e6%8f%92%e4%bb%b6%e5%bc%80%e5%8f%91)制作本插件

### 安装指南：
在插件市场打开本插件页面，在右侧点击`使用 HBuilderX 导入插件`，选择你的 `uniCloud admin` 项目点击确定

1. 等待下载安装完毕。由于本插件依赖一些uni-ui插件，下载完成后会显示合并插件页面，自行选择即可

2. 找到`/uni_modules/uni-feedback-admin/uniCloud/database/opendb-feedback.schema.json`，右键上传DB Schema。如果你在部署客户端时已经上传本步骤可跳过

3. 运行项目到`Chrome`

4. 运行起来uniCloud admin，菜单管理模块会自动读取`/uni_modules/uni-feedback-admin/uni-feedback-admin-menu.json`文件中的菜单配置，生成【待添加菜单】，选中`问题反馈`，点击`添加选中的菜单`即可

<div align="center">
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/9b1e918f-a852-42eb-878c-72d0f8a8b1b0.jpg" width="800"></img>
</div>

5. 添加成功后，就可以在左侧的菜单栏中找到`问题反馈`菜单

6. 由于插件依赖的uni-ui的一些组件，建议右键`/uni_modules/uni-feedback-admin`安装一下第三方依赖，否则可能会出现一些问题