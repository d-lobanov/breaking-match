const template = `
    <h2>Yo, here our rules</h2>
    <div class="list-of-rules">
        <ul>
            <li>Turn over any two cards</li>   
            <li>If the two cards match, they are removed</li>   
            <li>If they don't match, script turns them back over</li>   
            <li>Remember what was on each card and where it was</li>   
            <li>The game is over when all the cards have been matched</li>   
        </ul>
    </div>
    <button type="button" bm-click="onSubmit">ok</button>
`;

export default template;
