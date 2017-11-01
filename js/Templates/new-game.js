const template = `
    <h2>Level</h2>
    <div class="grid" id="complexity-grid">
        <figure class="selector" bm-for="item in complexities" bm-click="onComplexityClick">
            <div class="complexity" bm-class="item.style" bm-attr="complexity-id:item.id"></div>
            <figcaption bm-val="item.caption"></figcaption>
        </figure>
    </div>
    <h2>Card back</h2>
    <div class="grid" id="back-grid">
        <figure class="card-container selector" bm-for="style in back-styles">
            <div class="card" bm-attr="back-id:style" bm-click="onBackClick">
                <div class="back" bm-class="style"></div>
            </div>
        </figure>
    </div>

    <button type="button" bm-click="onSubmit">Let's cook!</button>
`;

export default template;
