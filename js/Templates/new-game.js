const template = `
    <div class="complexity-grid" id="complexity-grid">
        <figure class="selector" bm-for="item in complexities" bm-click="onComplexityClick">
            <div class="complexity" bm-class="item.style" bm-attr="complexity-id:item.id"></div>
            <figcaption bm-val="item.caption"></figcaption>
        </figure>
    </div>
    <div class="back-grid" id="back-grid">
        <figure class="card-container selector" bm-for="style in back-styles" bm-click="onBackClick">
            <div class="card" bm-attr="back-id:style">
                <div class="back" bm-class="style"></div>
            </div>
        </figure>
    </div>

    <button type="button" bm-click="onSubmit">Let's cook!</button>
`;

export default template;
