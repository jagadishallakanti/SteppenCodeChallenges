WITH monthly_orders AS (
    SELECT
        EXTRACT(YEAR FROM o.ordered_at) AS year,
        EXTRACT(MONTH FROM o.ordered_at) AS month,
        o.customer_id,
        SUM(oli.unit_price * oli.quantity) AS total_monthly_order_value
    FROM orders o
             JOIN order_line_items oli ON o.order_id = oli.order_id
    GROUP BY year, month, o.customer_id
),
     ranked_customers AS (
         SELECT
             year,
             month,
             customer_id,
             total_monthly_order_value,
             RANK() OVER (PARTITION BY year, month ORDER BY total_monthly_order_value DESC, customer_id) AS rank
         FROM monthly_orders
     )
SELECT
    year,
    month,
    customer_id,
    total_monthly_order_value
FROM ranked_customers
WHERE rank = 1
ORDER BY year, month;