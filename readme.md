# Tugas 2 IF3110 Pengembangan Aplikasi Berbasis Web

## Deskripsi Web Service Supplier

Web Service Supplier merupakan 3rd party web service yang menerima transaksi pembelian bahan-bahan untuk membuat coklat. Web service ini diakses oleh Factory untuk membeli ingredients yang dibutuhkan untuk membuat coklat.

## Deskripsi Basis Data

Basis data yang digunakan untuk supplier adalah MySQL. Di basis datanya hanya terdapat satu tabel, den berikut strukturnya.

[!basis data](image.png)

## Deskripsi Endpoint

Berikut daftar endpoint yang disediakan supplier:
* ```GET /api/ingredient```
    endpoint ini akan mereturn daftar ingredient yang ditawarkan supplier, bisa dengan harga atau tanpa harga. (```?show_price=1```)
* ```POST /api/transaction```
    endpoint ini digunakan untuk melakukan transaksi. body requestnya dalam bentuk JSON sebagai berikut.
    ```
    {
        "balance": 12345,
        "ingredients": [
            {
                "uuid": "",
                "quantity": 12345
            }
        ]
    }
    ```



