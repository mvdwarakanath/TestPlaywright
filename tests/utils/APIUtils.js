class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();

        if (!loginResponse.ok() || !loginResponseJson.token) {
            throw new Error(
                `Login failed (${loginResponse.status()}): ${JSON.stringify(loginResponseJson)}`
            );
        }

        return loginResponseJson.token;
    }

    async getProductId(productName, token) {
        const productResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
            {
                data: {
                    productName,
                    minPrice: null,
                    maxPrice: null,
                    productCategory: [],
                    productSubCategory: [],
                    productFor: []
                },
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );
        const productResponseJson = await productResponse.json();

        if (!productResponse.ok() || !Array.isArray(productResponseJson.data)) {
            throw new Error(
                `Could not load products (${productResponse.status()}): ${JSON.stringify(productResponseJson)}`
            );
        }

        const product = productResponseJson.data.find(
            item => item.productName?.trim().toLowerCase() === productName.trim().toLowerCase()
        );

        if (!product?._id) {
            throw new Error(`Product "${productName}" was not found in the catalog`);
        }

        return product._id;
    }

    async createOrder(orderPayLoad, token) {
        const authToken = token || await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();

        if (!orderResponse.ok() || !Array.isArray(orderResponseJson.orders) || !orderResponseJson.orders[0]) {
            throw new Error(
                `Order creation failed (${orderResponse.status()}): ${JSON.stringify(orderResponseJson)}`
            );
        }

        return { token: authToken, orderId: orderResponseJson.orders[0] };
    }
}
 
module.exports = { APIUtils };