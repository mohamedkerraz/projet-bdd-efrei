CREATE CONSTRAINT user_email IF NOT EXISTS FOR (u:User) REQUIRE u.email IS UNIQUE;
CREATE CONSTRAINT product_name IF NOT EXISTS FOR (p:Product) REQUIRE p.name IS UNIQUE;
CREATE CONSTRAINT category_name IF NOT EXISTS FOR (c:Category) REQUIRE c.name IS UNIQUE;

CREATE (u:User {name: 'John Doe', email: 'john@example.com'});

CREATE (c1:Category {name: 'Fruits'});
CREATE (c2:Category {name: 'Vegetables'});

CREATE (p1:Product {name: 'Apple', description: 'Fresh red apple', price: 1.99, stock: 100});
CREATE (p2:Product {name: 'Banana', description: 'Yellow banana', price: 0.99, stock: 150});
CREATE (p3:Product {name: 'Carrot', description: 'Orange carrot', price: 0.50, stock: 200});

CREATE (p1)-[:BELONGS_TO]->(c1);
CREATE (p2)-[:BELONGS_TO]->(c1);
CREATE (p3)-[:BELONGS_TO]->(c2);

CREATE (u)-[:PURCHASED {quantity: 5, date: datetime()}]->(p1);