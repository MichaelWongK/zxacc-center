function init(){
	window.userIds = [];
	window.userNames = [];
}

//渲染grid
layui.use(['table', 'laydate'], function(){
	var table = layui.table;
	var laydate = layui.laydate;

	table.render({
		elem: '#grid',
		id: 'grid',
		url: $.kbase.ctx + '/exam/grade/loadList',
		cellMinWidth: 80,
		cols: [[
		    {type:'checkbox'},
		    {type:'numbers'},
	        {field:'name', title: '名称', sort: true},
	        {field:'count', title: '学生人数', sort: true, templet: function(row){
	        	return row.users.length;
	        }},
	        {field:'createDate', title: '创建日期', sort: true, templet: function(row){
	        	return dateFns.format(row.createDate, 'YYYY-MM-DD');
	        }},
	        {field:'createUser', title: '创建人', sort: true}
	    ]],
	    done: function(res, curr, count){
	    	$('.layui-table-body').height($(window).height()-140);
	    },
	    page: true
	});
	
	window.laytable = table;
	
});

//新增和保存
$('#btnAdd, #btnEdit').click(function(){
	init();
	var _this = this;
	layui.use(['layer', 'table'], function(){
		var layer = layui.layer;
		var table = layui.table;
		
		
		//编辑
		if (_this.id=='btnEdit'){
			var checked = table.checkStatus('grid');
			if (checked.data.length>0){
				var row = checked.data[0];
				
				$('#id').val(row.id);
				$('input[name="name"]').val(row.name);
				if (row.users){
					$(row.users).each(function(i, item){
						if ($.inArray(item.id, userIds)==-1){
							userIds.push(item.id);
							userNames.push(item.userInfo.username);
						}
					});
					$('.zx-user-panel').html(userNames.join(' '));
				}
			}else{
				return false;
			}
		}else{
			$('#id').val('');
			$('input[name="name"]').val('');
			$('.zx-user-panel').empty();
		}
		
		layer.open({
			type: 1,
			btn: ['保存'],
			area: ['auto', 'auto'],
			content: $('.zx-panel'),
			yes: function(index, layero){
				
				if ($('input[name="name"]').val().trim()==''){
					$('input[name="name"]').focus();
					return false;
				}
				if (userIds.length==0){
					layer.alert('请选择学员');
					return false;
				}
				var param = {
					id: $('#id').val(),
					name: $('input[name="name"]').val(),
					users: userIds
				}
				
				$.post($.kbase.ctx + '/exam/grade/save', param, function(data){
					if (data.success){
						layer.alert('保存成功', function(index0){
							table.reload('grid', {page: {curr: 1}});
							layer.close(index0);
							layer.close(index);
						});
					}
				});
				
			}
		});
	});
});
//删除班级
$('#btnDel').click(function(){
	layui.use(['layer', 'table'], function(){
		var layer = layui.layer;
		var table = layui.table;
		
		var checked = table.checkStatus('grid');
		if (checked.data.length>0){
			var row = checked.data[0];
			layer.confirm('确定删除吗', function(index){
				var param = {
					id: row.id
				}
				$.post($.kbase.ctx + '/exam/grade/delete', param, function(data){
					if (data.success){
						table.reload('grid', {page: {curr: 1}});
					}
					layer.close(index);
				}, 'json');
			});
			
		}
	});
});
//查询
$('#btnQuery').click(function(){
	var keyword = $('#keyword').val();
//	if (keyword=='') {
//		$('#keyword').select();
//		return false;
//	}
	
	layui.use(['table'], function(){
		var table = layui.table;
		table.reload('grid', {
			page: {curr: 1},
			where: {
				keyword: keyword
			}
		});
	});
});
$('#keyword').keyup(function(e){
	if (e.keyCode==13){
		$('#btnQuery').click();
	}
});
//选择
$('#btnPick').click(function(){
	layui.use(['layer'], function(){
		var layer = layui.layer;
		layer.open({
			type: 2,
			btn: ['保存'],
			area: ['1000px', '460px'],
			content: $.kbase.ctx + '/user/list?_p=grade',
			success: function(layero, index){
				
			},
			yes: function(index, layero){
				var _win = $(layero).find("iframe")[0].contentWindow;
				//获取用户grid里选中的数据
				var checked = _win.laytable.checkStatus('grid');
				if (checked.data.length>0){
					$(checked.data).each(function(i, item){
						if ($.inArray(item.id, userIds)==-1){
							userIds.push(item.id);
							userNames.push(item.usernameCN);
						}
					});
					$('.zx-user-panel').html(userNames.join(' '));
				}else{
					return false;
				}
				layer.close(index);
			}
		});
	});
});