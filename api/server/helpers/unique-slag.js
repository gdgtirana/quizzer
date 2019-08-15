const randomNumber = require('./random-number')

module.exports = async (slug, dbInstance) => {

  try {
    slug = slug + randomNumber(10)

    let active = true
    while( active ) {
      const existing = await dbInstance.findOne({slug: slug})
      if( existing )
        slug = slug + randomNumber(10)
      else
        active = false
    }

    return slug

  } catch(err) {
    throw err
  } 

}