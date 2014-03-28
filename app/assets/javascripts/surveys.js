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
	$(currentInput).val($(currentInput).val().split(',')[0]); //to handle Google Places return values and get plain name of establishment
}

function countValidAnswers(){
	var answerCount = 0;
		$('.countable').each(function(){
			if ($(this).val().length > 2)
			{
				answerCount++;
			}
		});
		$('#answerCount').html(answerCount + ' Points');
		if (answerCount > 14)
		{
			$('#submitButton').val('All Done!').removeClass('disabled');
		}
}