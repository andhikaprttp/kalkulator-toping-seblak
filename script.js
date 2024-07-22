// JS

      const toppings = [
            { name: "Kerupuk bunga", price: 1000 },
            { name: "Kerupuk mawar warna/i", price: 1000 },
            { name: "Cuanki lidah", price: 2000 },
            { name: "Cuanki tahu", price: 2000 },
            { name: "Siomay mini", price: 2000 },
            { name: "Pilus cikur", price: 1000 },
            { name: "Mie", price: 1000 },
            { name: "Sawi putih/hijau", price: 1000 },
            { name: "Pentol lava beranak", price: 12000 },
            { name: "Pentol Dewo", price: 7500 },
            { name: "Sosis jumbo", price: 5000 },
            { name: "Telur", price: 3000 },
            { name: "Sosis merah", price: 2000 },
            { name: "Cikuwa", price: 2000 },
            { name: "Odeng", price: 2000 },
            { name: "Ekor udang", price: 2000 },
            { name: "Dumpling ayam", price: 2500 },
            { name: "Kembang cumi", price: 1500 },
            { name: "Udang gulung", price: 1500 },
            { name: "Tofu", price: 1000 },
            { name: "Scallop", price: 1000 },
            { name: "Pentol ayam", price: 1000 },
            { name: "Pentol cilok 2pcs", price: 1000 },
        ];

        const toppingTable = document.getElementById('toppingTable');
        const totalPriceElem = document.getElementById('totalPrice');
        const receiptElem = document.getElementById('receipt');
        let total = 0;
        let receiptDetails = {};

        toppings.forEach(topping => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="topping-name">${topping.name}</td>
                <td>Rp ${topping.price.toLocaleString()}</td>
                <td class="d-flex align-items-center">
                    <button class="btn btn-sm btn-danger btn-qty me-2" onclick="updateQuantity('${topping.name}', -1)">-</button>
                    <span class="qty-display mx-2" id="qty-${topping.name.replace(/\s+/g, '')}">0</span>
                    <button class="btn btn-sm btn-success btn-qty ms-2" onclick="updateQuantity('${topping.name}', 1)">+</button>
                </td>
            `;
            toppingTable.appendChild(row);
        });

        function updateQuantity(name, delta) {
            const qtyElem = document.getElementById(`qty-${name.replace(/\s+/g, '')}`);
            let qty = parseInt(qtyElem.innerText);
            if (qty + delta >= 0) {
                qty += delta;
                qtyElem.innerText = qty;
                const topping = toppings.find(t => t.name === name);
                total += delta * topping.price;
                totalPriceElem.innerText = `Rp ${total.toLocaleString()}`;

                if (qty > 0) {
                    receiptDetails[name] = { price: topping.price, qty: qty };
                } else {
                    delete receiptDetails[name];
                }

                updateReceipt();
            }
        }

        function updateReceipt() {
            const customerName = document.getElementById('customerName').value || "Pembeli";
            receiptElem.innerHTML = `<div class="customer-name">Nama Pembeli: ${customerName}</div>`;
            for (const [name, detail] of Object.entries(receiptDetails)) {
                const item = document.createElement('div');
                item.classList.add('receipt-item');
                item.innerHTML = `
                    <div>${name}</div>
                    <div>${detail.qty} x Rp ${detail.price.toLocaleString()} = Rp ${(detail.qty * detail.price).toLocaleString()}</div>
                `;
                receiptElem.appendChild(item);
            }
        }
