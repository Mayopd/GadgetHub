
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import products from '../server/data/products.js'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diatur di .env')
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seedProducts() {
  try {
    // Ambil seluruh kategori dari Supabase
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id, name')

    if (categoryError) throw categoryError

    // Buat pemetaan nama kategori ke ID
    const categoryMap = new Map(
      categories.map(category => [
        category.name.trim().toLowerCase(),
        category.id
      ])
    )

    let successCount = 0

    for (const product of products) {
      const categoryName = product.category?.trim().toLowerCase()
      const categoryId = categoryMap.get(categoryName)

      if (!categoryId) {
        console.warn(
          `Kategori "${product.category}" tidak ditemukan untuk produk "${product.name}". Produk dilewati.`
        )
        continue
      }

      const productData = {
        category_id: categoryId,
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        description: product.description || '',
        image: product.image || ''
      }

      if (!Number.isFinite(productData.price)) {
        console.warn(`Harga produk "${product.name}" tidak valid. Produk dilewati.`)
        continue
      }

      // Cek apakah produk sudah ada agar tidak terjadi duplikasi
      const { data: existingProduct, error: searchError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('brand', product.brand)
        .maybeSingle()

      if (searchError) throw searchError

      let result

      if (existingProduct) {
        // Perbarui produk jika sudah tersedia
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', existingProduct.id)
      } else {
        // Tambahkan produk baru
        result = await supabase
          .from('products')
          .insert(productData)
      }

      if (result.error) throw result.error

      successCount++
      console.log(`Berhasil: ${product.name}`)
    }

    console.log(`\nMigrasi selesai. ${successCount} dari ${products.length} produk berhasil diproses.`)
  } catch (error) {
    console.error('Migrasi gagal:', error.message)
  }
}

seedProducts()
