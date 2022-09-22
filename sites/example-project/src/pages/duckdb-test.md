# Testing csv connection via DuckDB

This project contains two csv files: `orders.csv` and `deliveries.csv`

Below there are queries for both files, and one query that joins them.


```all_orders
select * from orders
```

```all_deliveries
select * from deliveries
```

```join
select * from orders 
left join deliveries 
on orders.id = deliveries.order_id

limit 100
```
