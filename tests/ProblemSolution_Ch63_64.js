

Yes—rather than guessing IDs, we can look up a product from the catalog and use its ID. I’ll inspect the current test and helper to see the cleanest way to fit that into your existing flow.

Read 
Completed with input: {
  "path": "C:\\TestPlaywright\\tests\\code_download_ch64.spec.js"
}

Read 
Completed with input: {
  "path": "C:\\TestPlaywright\\tests\\utils\\APIUtils.js"
}

Search for `productOrderedId|api/ecom/product|getProduct|products|createOrder`

Ran terminal command: git --no-pager status --short; Get-Content package.json

Ran terminal command: $body = @{ productName = ''; minPrice = $null; maxPrice = $null; productCategory = @(); productSubCategory = @(); productFor = @() } | ConvertTo-Json -Depth 5; try { $result = Invoke-RestMethod -Uri 'https://rahulshettyacademy.com/api/ecom/product/get-all-products' -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 20; $result | ConvertTo-Json -Depth 4 } catch { Write-Output "Catalog API check failed: $($_.Exception.Message)"; exit 1 }
Tool execution failed with exit code 1

Yes. Keep a readable product name, fetch the catalog after login, and use the matching product’s `_id` when creating the order. The ID then comes from the live catalog instead of being hard-coded in `code_download_ch64.spec.js`.

Add a lookup method to `APIUtils.js`:

```js
async getProductId(productName, token) {
    const response = await this.apiContext.post(
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
            headers: { Authorization: token }
        }
    );

    const result = await response.json();
    if (!response.ok() || !Array.isArray(result.data)) {
        throw new Error(`Could not load products (${response.status()}): ${JSON.stringify(result)}`);
    }

    const product = result.data.find(item => item.productName === productName);
    if (!product) {
        throw new Error(`Product "${productName}" was not found in the catalog`);
    }

    return product._id;
}
```

Then use that returned ID in the order request. You’ll still choose a product by name (for example, from `TEST_PRODUCT_NAME`), but you won’t need to maintain its changing ID manually.