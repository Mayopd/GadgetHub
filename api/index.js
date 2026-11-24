import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

import supabase from './supabase.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true)
    } else {
      callback(new Error('File harus berupa gambar.'))
    }
  }
})

// Mengubah data database menjadi format yang digunakan frontend
function formatProduct(product) {
  return {
    ...product,
    category: product.categories?.name || '',
    galleryImages: product.gallery_images || [],
    specifications: product.specifications || {},
    price: Number(product.price)
  }
}

// Mengambil ID kategori berdasarkan nama kategori
async function getCategoryId(category) {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', String(category).trim())
    .single()

  if (error || !data) {
    throw new Error('Kategori tidak ditemukan.')
  }

  return data.id
}

// Memeriksa login dan hak akses admin
async function requireAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        message: 'Silakan login terlebih dahulu.'
      })
    }

    const authClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    const {
      data: { user },
      error: authError
    } = await authClient.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({
        message: 'Sesi login tidak valid.'
      })
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error || profile?.role !== 'admin') {
      return res.status(403).json({
        message: 'Akses hanya untuk admin.'
      })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Halaman utama API
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'GadgetHub API is running'
  })
})

// GET seluruh produk
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .order('id', { ascending: false })

    if (error) throw error

    res.json({
      status: 'success',
      total: data.length,
      data: data.map(formatProduct)
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

// GET detail produk
app.get('/api/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .eq('id', req.params.id)
      .single()

    if (error || !data) {
      return res.status(404).json({
        status: 'error',
        message: 'Produk tidak ditemukan.'
      })
    }

    res.json({
      status: 'success',
      data: formatProduct(data)
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

// POST tambah produk
app.post('/api/products', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      category_id,
      brand,
      price,
      image,
      description,
      specifications,
      galleryImages,
      gallery_images
    } = req.body

    if (
      !name?.trim() ||
      (!category && !category_id) ||
      !brand?.trim() ||
      price === undefined ||
      price === ''
    ) {
      return res.status(400).json({
        message: 'Nama, kategori, merek, dan harga wajib diisi.'
      })
    }

    const numericPrice = Number(price)

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: 'Harga harus berupa angka yang valid.'
      })
    }

    const categoryId = category_id || await getCategoryId(category)

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: name.trim(),
        category_id: categoryId,
        brand: brand.trim(),
        price: numericPrice,
        image: image || null,
        description: description || '',
        specifications: specifications || {},
        gallery_images: galleryImages || gallery_images || (image ? [image] : [])
      })
      .select('*, categories(id, name)')
      .single()

    if (error) throw error

    res.status(201).json({
      status: 'success',
      message: 'Produk berhasil ditambahkan.',
      data: formatProduct(data)
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

// PUT edit produk
app.put('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      category_id,
      brand,
      price,
      image,
      description,
      specifications,
      galleryImages,
      gallery_images
    } = req.body

    const updates = {}

    if (name !== undefined) updates.name = name.trim()
    if (brand !== undefined) updates.brand = brand.trim()
    if (image !== undefined) updates.image = image
    if (description !== undefined) updates.description = description
    if (specifications !== undefined) {
      updates.specifications = specifications
    }

    if (price !== undefined) {
      const numericPrice = Number(price)

      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          message: 'Harga harus berupa angka yang valid.'
        })
      }

      updates.price = numericPrice
    }

    if (category_id !== undefined) {
      updates.category_id = category_id
    } else if (category !== undefined) {
      updates.category_id = await getCategoryId(category)
    }

    if (galleryImages !== undefined) {
      updates.gallery_images = galleryImages
    } else if (gallery_images !== undefined) {
      updates.gallery_images = gallery_images
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', req.params.id)
      .select('*, categories(id, name)')
      .single()

    if (error) throw error

    res.json({
      status: 'success',
      message: 'Produk berhasil diperbarui.',
      data: formatProduct(data)
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

// DELETE produk
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)
      .select('id')
      .single()

    if (error) throw error

    res.json({
      status: 'success',
      message: 'Produk berhasil dihapus.',
      data
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

// GET seluruh kategori (dikembalikan sebagai array string agar kompatibel dengan Categories.jsx)
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('id', { ascending: true })

    if (error) throw error

    const categoryNames = data.map(item => item.name)

    res.json({
      status: 'success',
      total: categoryNames.length,
      data: categoryNames
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

// GET produk berdasarkan kategori
app.get('/api/categories/:category/products', async (req, res) => {
  try {
    const categoryId = await getCategoryId(req.params.category)

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .eq('category_id', categoryId)
      .order('id', { ascending: false })

    if (error) throw error

    res.json({
      status: 'success',
      total: data.length,
      data: data.map(formatProduct)
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

// SEARCH produk berdasarkan nama, merek, atau kategori
app.get('/api/search', async (req, res) => {
  try {
    const keyword = String(req.query.q || '').trim()

    if (!keyword) {
      return res.json({
        status: 'success',
        total: 0,
        data: []
      })
    }

    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .ilike('name', `%${keyword}%`)

    if (categoryError) throw categoryError

    const categoryIds = categories.map(item => item.id)

    let query = supabase
      .from('products')
      .select('*, categories(id, name)')
      .or(`name.ilike.%${keyword}%,brand.ilike.%${keyword}%`)

    if (categoryIds.length > 0) {
      query = supabase
        .from('products')
        .select('*, categories(id, name)')
        .or(
          `name.ilike.%${keyword}%,brand.ilike.%${keyword}%,category_id.in.(${categoryIds.join(',')})`
        )
    }

    const { data, error } = await query.order('id', {
      ascending: false
    })

    if (error) throw error

    res.json({
      status: 'success',
      total: data.length,
      data: data.map(formatProduct)
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

// Upload gambar produk ke Supabase Storage (Menambahkan ke galeri, bukan mengganti)
app.post(
  '/api/products/:id/images/upload',
  requireAdmin,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'Pilih gambar terlebih dahulu.'
        })
      }

      const { data: product, error: productError } = await supabase
        .from('products')
        .select('image, gallery_images')
        .eq('id', req.params.id)
        .single()

      if (productError) throw productError

      const extension = req.file.mimetype.split('/')[1]
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
      const filePath = `products/${req.params.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: publicUrl } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      const baseGallery = product.gallery_images?.length
        ? product.gallery_images
        : (product.image ? [product.image] : [])

      const galleryImages = [...baseGallery, publicUrl.publicUrl]

      const { error: updateError } = await supabase
        .from('products')
        .update({
          image: product.image || publicUrl.publicUrl,
          gallery_images: galleryImages
        })
        .eq('id', req.params.id)

      if (updateError) throw updateError

      res.status(201).json({
        status: 'success',
        message: 'Gambar produk berhasil ditambahkan ke galeri.',
        data: galleryImages
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
)

// Menambahkan gambar produk menggunakan URL (Menambahkan ke galeri, bukan mengganti)
app.post(
  '/api/products/:id/images/url',
  requireAdmin,
  async (req, res) => {
    try {
      const { imageUrl } = req.body

      if (!imageUrl) {
        return res.status(400).json({
          message: 'URL gambar wajib diisi.'
        })
      }

      const parsedUrl = new URL(imageUrl)

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return res.status(400).json({
          message: 'URL gambar tidak valid.'
        })
      }

      const { data: product, error } = await supabase
        .from('products')
        .select('image, gallery_images')
        .eq('id', req.params.id)
        .single()

      if (error) throw error

      const baseGallery = product.gallery_images?.length
        ? product.gallery_images
        : (product.image ? [product.image] : [])

      const galleryImages = [...baseGallery, imageUrl]

      const { error: updateError } = await supabase
        .from('products')
        .update({
          image: product.image || imageUrl,
          gallery_images: galleryImages
        })
        .eq('id', req.params.id)

      if (updateError) throw updateError

      res.status(201).json({
        status: 'success',
        message: 'URL gambar berhasil ditambahkan ke galeri.',
        data: galleryImages
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
)

// Menghapus gambar tambahan
app.delete(
  '/api/products/:id/images/:index',
  requireAdmin,
  async (req, res) => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('gallery_images')
        .eq('id', req.params.id)
        .single()

      if (error) throw error

      const images = [...(product.gallery_images || [])]
      const index = Number(req.params.index)

      if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= images.length
      ) {
        return res.status(404).json({
          message: 'Foto tidak ditemukan.'
        })
      }

      const removedImage = images[index]
      images.splice(index, 1)

      const { error: updateError } = await supabase
        .from('products')
        .update({
          gallery_images: images
        })
        .eq('id', req.params.id)

      if (updateError) throw updateError

      const marker = '/storage/v1/object/public/product-images/'
      const markerIndex = removedImage.indexOf(marker)

      if (markerIndex !== -1) {
        const filePath = decodeURIComponent(
          removedImage.slice(markerIndex + marker.length)
        )

        await supabase.storage
          .from('product-images')
          .remove([filePath])
      }

      res.json({
        status: 'success',
        message: 'Gambar berhasil dihapus.',
        data: images
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
)

// Menangani endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan.'
  })
})

// Menangani error
app.use((error, req, res, next) => {
  console.error(error)

  res.status(400).json({
    status: 'error',
    message: error.message || 'Terjadi kesalahan.'
  })
})

app.listen(PORT, () => {
  console.log(`GadgetHub API running at http://localhost:${PORT}`)
})

export default app