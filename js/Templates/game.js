const template = `
    <div class="clock"><span bm-bval="time"></span></div>
    <div bm-for="row in rows" class="row">
        <section bm-for="card in row" class="card-container">
            <bm-if statement="!card.removed">
                <div bm-click="onClick" bm-attr="card-id:card.id" class="card">
                    <div class="back" bm-class="card-back"></div>
                    <div class="front" bm-class="card.type"></div>
                </div>
            </bm-if>
        </section>
    </div>
`;

export default template;
