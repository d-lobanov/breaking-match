const template = `
    <div class="clock">
        <span bm-bval="time"></span>
        <button type="button" bm-click="onNewGameClick">New Game</button>
    </div>
    <div class="grid" bm-class="grid-class">
        <section class="card-container" bm-for="card in cards">
            <bm-if statement="!card.removed">
                <div bm-click="onClick" bm-attr="card-id:card.id" class="card">
                    <div class="front" bm-class="card.type"></div>
                    <div class="back" bm-class="card-back"></div>
                </div>
            </bm-if>
        </section>
    </div>
`;

export default template
