$(() => {
    const PRODUCTS_URL = 'https://5f5925d78040620016ab8e77.mockapi.io/warehouse';
    let list = [];

    const $productList = $('#productList');
    const productTemplate = $('#productTemplate').html();
    const $inputs = $('.ui-corner-all');
    const $productForm = $('#productForm');
    const $dialog = $('#dialogForm').dialog({
        autoOpen: false,
        height: 520,
        width: 350,
        modal: true,
        buttons: {
            Сохранить: () => {
                saveProduct();
                $dialog.dialog('close');
            },
            Отмена: () => $dialog.dialog('close'),
        },
        close: function () {
            resetForm();
        },
    });

    function resetForm() {
        $inputs.val('');
    }

    $productForm.on('submit', (e) => {
        e.preventDefault();
        saveProduct()
    });

    $('#createProduct').on('click', () => openModal(getEmptyProduct()));
    $productList.on('click', '.edit-btn', onEditBtnClick);
    $productList.on('click', '.delete-btn', onDeleteBtnClick);
    $productList.on('click', '.action', onSumBtnClick);

    init();

    function init() {
        getData().then(setData).then(renderData);
    }
    
    function getData() {
        return fetch(PRODUCTS_URL).then((res) => res.json());
    }

    function setData(data) {
        return (list = data);
    }

    function renderData(data) {
        const html = data.map(getProductHtml).join('\n');
        $productList.html(html);
    }

    function getProductHtml(product) {
        return productTemplate
            .replace('{{id}}', product.id)
            .replace('{{name}}', product.name)
            .replace('{{diameter}}', product.diameter)
            .replace('{{weight}}', product.weight)
            .replace('{{trademark}}', product.trademark)
            .replace('{{balance}}', product.balance)
    }

    function openModal(product) {
        fillForm(product);
        $dialog.dialog('open');
    }

    function onEditBtnClick(e) {
        const id = getProductId(e.target);
        editProduct(id);
    }

    function onDeleteBtnClick(e) {
        e.stopPropagation();
        const id = getProductId(e.target);
        deleteProduct(id);
    }

    function onSumBtnClick(e) {
        const id = getProductId(e.target);        
        const product = getProduct(id);
        const balance = +product.balance;

        switch ($(e.target).closest('.action').data('btn')) {
            case 'sum':
                const userNumberSum = +prompt('Введите количество прихода', '');
                sum(balance, userNumberSum, product);
                break;
            case 'sub':
                const userNumberSub = +prompt('Введите количество расхода', '');
                sub(balance, userNumberSub, product);
                break;            
            default: alert('Пожалуйста, проверьте Ваш выбор');
        }
    }

    function sum(x, y, product) {
        result = x + y;
        product.balance = result;
        updateProduct(product);
    }

    function sub(x, y, product) {
        result = x - y;
        product.balance = result;
        updateProduct(product);
    }

    function getProductId(el) {
        return $(el)
            .closest('.product')
            .data('id');
    }

    function getProductElement(id) {
        return $productList.find(`[data-id="${id}"]`);
    }

    function getProduct(id) {
        return list.find((item) => item.id == id);
    }

    function editProduct(id) {
        openModal(getProduct(id));
    }

    function updateProduct(product) {
        fetch(`${PRODUCTS_URL}/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        list = list.map((item) => (item.id == product.id ? product : item));
        getProductElement(product.id).replaceWith(getProductHtml(product));
    }

    function createProduct(product) {
        fetch(`${PRODUCTS_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((product) => {
                list.push(product);
                $productList.append(getProductHtml(product));
            });
    }

    function deleteProduct(id) {
        fetch(`${PRODUCTS_URL}/${id}`, {
            method: 'DELETE',
        });

        getProductElement(id).remove();
    }

    function getEmptyProduct() {
        return {
            id: '',
            name: '',
            diameter: '',
            weight: '',
            trademark: '',
            balance: '',
        };
    }

    function fillForm(product) {
        $inputs.each((i, el) => {
            el.value = product[el.name];
        });
    }

    function getFormData() {
        let product = {};
        $inputs.each((el) => {
            product[el.name] = el.value;
        });

        return product;
    }

    function saveProduct() {
        const product = getFormData();

        if (product.id) {
            updateProduct(product);
        } else {
            createProduct(product);
        }
    }
});