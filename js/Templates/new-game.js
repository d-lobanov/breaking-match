const template = `
    <div class="selector complexity">
        <input id="complexity-0" type="radio" name="complexity" value="0" bm-click="onComplexityClick"/>
        <label class="img-radio complexity-0" for="complexity-0"></label>

        <input id="complexity-1" type="radio" name="complexity" value="1" bm-click="onComplexityClick"/>
        <label class="img-radio complexity-1" for="complexity-1"></label>        

        <input id="complexity-2" type="radio" name="complexity" value="2" bm-click="onComplexityClick"/>
        <label class="img-radio complexity-2" for="complexity-2"></label>
    </div>
    <div class="selector back">
        <input id="back-0" type="radio" name="back" value="back-0" bm-click="onBackClick"/>
        <label class="img-radio back-0" for="back-0"></label>

        <input id="back-1" type="radio" name="back" value="back-1" bm-click="onBackClick"/>
        <label class="img-radio back-1" for="back-1"></label>

        <input id="back-2" type="radio" name="back" value="back-2" bm-click="onBackClick"/>
        <label class="img-radio back-2" for="back-2"></label>
    </div>

    <button type="button" bm-click="onSubmit">Let's cook!</button>
`;

export default template;
