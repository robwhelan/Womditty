function renderNewInput(currentInput, nextInput){
	$(currentInput).blur(function(){
		if ($(currentInput).val().length > 2)
			{
				$(nextInput).removeClass('hidden').focus();
			}
	});
}