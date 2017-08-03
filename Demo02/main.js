window.onload = function () {
    var customName = document.getElementById('customName');
    var randomize = document.querySelector('.randomize');
    var story = document.querySelector('.story');

    var storyText = 'It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
    var insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
    var insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
    var insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

    function randomValueFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    randomize.addEventListener('click', result);

    function result() {
        var newResult = storyText;

        var XItem = randomValueFromArray(insertX);
        var YItem = randomValueFromArray(insertY);
        var ZItem = randomValueFromArray(insertZ);

        newResult = newResult.replace(":insertx:", XItem);
        newResult = newResult.replace(":insertx:", XItem);        
        newResult = newResult.replace(":inserty:", YItem);
        newResult = newResult.replace(":insertz:", ZItem);

        if (customName.value !== "") {
            var name = customName.value;
            newResult = newResult.replace("Bob", name);
        }

        if (document.getElementById('UK').checked) {
            var weight = Math.round(300 * 0.0714286) + 'stone';
            var temperature = Math.round((94 - 32) * 5 / 9) + 'centigrade';
            newResult = newResult.replace('94 fareheit'.temperature);
            newResult = newResult.replace('300 pounds', weight);
        }
        console.log(newResult);
        story.textContent = newResult;
        story.style.visibility = 'visible';
    }
}