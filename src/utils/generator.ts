import {faker} from "@faker-js/faker";

export function generator(data: Record<string, string>[]): Record<string, string> {
    const copy = {}
    data.forEach(item => {
        let val: string
        /*
        * TODO
        *  When switch statements have large sets of case clauses, it is usually an attempt to map two sets of data.
        *  A real map structure would be more readable and maintainable, and should be used instead.
        * */
        switch (item.type) {
            case 'username':
                val = faker.internet.userName()
                break
            case 'first-name':
                val = faker.person.firstName()
                break
            case 'last-name':
                val = faker.person.lastName()
                break
            case 'full-name':
                val = faker.person.fullName()
                break
            case 'avatar':
                val = faker.image.avatar()
                break
            case 'birthday':
                val = faker.date.birthdate().toLocaleDateString()
                break
            case 'date_soon':
                val = faker.date.soon().toLocaleDateString()
                break
            case 'password':
                val = faker.internet.password()
                break
            case 'email':
                val = faker.internet.email().toLowerCase()
                break
            case 'phone':
                val = faker.phone.number()
                break;
            case 'color':
                val = faker.internet.color()
                break
            case 'gender':
                val = faker.person.gender()
                break
            case 'bio':
                val = faker.person.bio()
                break
            case 'job_title':
                val = faker.person.jobTitle()
                break;
            case 'zodiac':
                val = faker.person.zodiacSign()
                break
            case 'sex':
                val = faker.person.sex()
                break
            case 'img_url':
                val = faker.image.url()
                break;
            case 'img_abstract':
                val = faker.image.urlLoremFlickr({category: 'abstract'})
                break
            case 'img_animals':
                val = faker.image.urlLoremFlickr({category: 'animals'})
                break
            case 'img_business':
                val = faker.image.urlLoremFlickr({category: 'business'})
                break
            case 'img_cats':
                val = faker.image.urlLoremFlickr({category: 'cats'})
                break
            case 'img_city':
                val = faker.image.urlLoremFlickr({category: 'city'})
                break
            case 'img_fashion':
                val = faker.image.urlLoremFlickr({category: 'fashion'})
                break
            case 'img_food':
                val = faker.image.urlLoremFlickr({category: 'food'})
                break
            case 'img_nature':
                val = faker.image.urlLoremFlickr({category: 'nature'})
                break
            case 'img_person':
                val = faker.image.urlLoremFlickr({category: 'people'})
                break
            case 'img_sports':
                val = faker.image.urlLoremFlickr({category: 'sports'})
                break
            case 'img_technics':
                val = faker.image.urlLoremFlickr({category: 'technics'})
                break
            case 'img_transport':
                val = faker.image.urlLoremFlickr({category: 'transport'})
                break
            case 'text':
                val = faker.lorem.paragraphs()
                break
            case 'amount':
                val = faker.finance.amount()
                break
            case 'credit_card':
                val = faker.finance.creditCardNumber()
                break
            case 'currency_code':
                val = faker.finance.currencyCode()
                break
            case 'currency_name':
                val = faker.finance.currencyName()
                break
            case 'currency_symbol':
                val = faker.finance.currencySymbol()
                break
            case 'account_number':
                val = faker.finance.accountNumber()
                break
            case 'account_name':
                val = faker.finance.accountName()
                break
            case 'commerce_department':
                val = faker.commerce.department()
                break
            case 'commerce_isbn':
                val = faker.commerce.isbn()
                break
            case 'price':
                val = faker.commerce.price()
                break
            case 'product':
                val = faker.commerce.product()
                break
            case 'product_description':
                val = faker.commerce.productDescription()
                break
            case 'product_descriptive_name':
                val = faker.commerce.productName()
                break
            case 'company_name':
                val = faker.company.name()
                break
            case 'address_no':
                val = faker.location.buildingNumber()
                break
            case 'address_city':
                val = faker.location.city()
                break
            case 'address_country':
                val = faker.location.country()
                break
            case 'address_county':
                val = faker.location.county()
                break
            case 'address_country_code':
                val = faker.location.countryCode()
                break
            case 'address_zipcode':
                val = faker.location.zipCode()
                break
            case 'address_latitude':
                val = faker.location.latitude().toString()
                break
            case 'address_longitude':
                val = faker.location.longitude().toString()
                break
            case 'address_state':
                val = faker.location.state()
                break
            case 'address_street':
                val = faker.location.street()
                break
            case 'address_street_address':
                val = faker.location.streetAddress()
                break
            case 'address_timezone':
                val = faker.location.timeZone()
                break
            case 'uuid':
                val = faker.string.uuid()
                break
            default:
                val = ''
        }
        Object.assign(copy, {[`${item.name}`]: val})
    })
    return copy
}
