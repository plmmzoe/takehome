To run project:

# Pre-requisite

Python and Node.js should be installed
* Python [https://www.python.org/downloads/](python download)
* Node.js [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm](npm Docs)

# Backend
```
cd backend
python manage.py runserver
```

## access
* Product List: /api/listings/
* Category List: /api/categories/
* Tag List: /api/tags/

## post product
Sample: 
```
{
    "id": 1,
    "name": "Sample product",
    "description": "Sample product description",
    "category": 1,
    "tags": [1]
}
```
## post category
Sample:
```
{
    "name": "Sample category"
}
```

## post tag
Sample:
```
{
    "name": "Sample tag"
}
```

# Frontend
```
cd frontend
npm install
npm run start
```

# Assumption
* Assumed category and tag names are disctinct

# Additional
## admin:
UserName: zoez
Email: zoez@admin.com
Password: password123.

## Reference:
1. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
2. https://mantine.dev/
3. https://docs.djangoproject.com/en/5.2/ (Lookup API, QuerySet)
4. https://django-filter.readthedocs.io/en/stable/ref/filters.html?utm_source=chatgpt.com (filter)
