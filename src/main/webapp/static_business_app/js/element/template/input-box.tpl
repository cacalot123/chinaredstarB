<div class="input-box g-hrz <#=data.fieldName#>">
	<#if(!data.no_label){#>
		<div class="label u-wrap"><#=data.text#></div>		
	<#}#>
	<input type="<#=data.type||'text'#>" class="u-full" placeholder="<#=data.placeholder#>"  />
	<div class="label-right"><#=data.label_right#></div>		
	<div class="clear-both"></div>
</div>