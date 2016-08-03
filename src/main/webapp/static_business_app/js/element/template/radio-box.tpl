<div class="radio-box g-hrz <#=data.fieldName#>">
	<div class="label u-wrap"><#=data.text#></div>		
	<div class="u-full"></div>
	<!-- <input type="<#=data.type||'text'#>" class="u-full" placeholder="<#=data.placeholder#>" /> -->
	<#for(var i=0;i<data.selections.length;i++){#>
		<div class="selection" index="<#=i#>" data-value="<#=data.selections[i].value#>">
			<div class="selection-button"><i class="icon iconfont selection-unselect">&#xe605;</i></div>
			<div class="selection-text"><#=data.selections[i].text#></div>			
			<div class="clear-both"></div>
		</div>		
	<#}#>
	<div class="clear-both"></div>
	<input type="hidden"  />
</div>