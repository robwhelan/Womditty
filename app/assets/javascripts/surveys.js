function renderNewInput(currentInput, nextInputDiv, nextInput, button){
	$(currentInput).blur(function(){
		if ($(currentInput).val().length > 2)
			{
				$(nextInputDiv).removeClass('hidden');
				$(nextInput).focus();
			}
	});
	$(button).click(function(){
		if ($(currentInput).val().length > 2)
			{
				$(nextInputDiv).removeClass('hidden');
				$(nextInput).focus();
			}
		
	})
}

function countValidAnswers(){
	var answerCount = 0;
		$('.countable').each(function(){
			if ($(this).val().length > 2)
			{
				answerCount++;
			}
		});
		$('#answerCount').html(answerCount);
		if (answerCount > 49)
		{
			$('#submitButton').val('All Done!').removeClass('disabled');
		}
}