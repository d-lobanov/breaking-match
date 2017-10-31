const template = `
    <div class="clock">
        <span bm-bval="time"></span>
        <button type="button" bm-click="onNewGameClick">New Game</button>
    </div>
    <div bm-for="row in rows" class="row">
        <section bm-for="card in row" class="card-container">
            <bm-if statement="!card.removed">
                <div bm-click="onClick" bm-attr="card-id:card.id" class="card">
                    <div class="front" bm-class="card.type"></div>
                    <div class="back" bm-class="card-back"></div>
                </div>
            </bm-if>
        </section>
    </div>
`;

export default template;
