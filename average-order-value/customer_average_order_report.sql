-- Each order can one or more multiple line items, so we need to use COUNT(DISTINCT) to count order only once
SELECT
    c.name AS customer_name,
    COUNT(DISTINCT o.order_id) AS number_of_orders,
    SUM(oli.unit_price * oli.quantity) AS total_order_value,
    (SUM(oli.unit_price * oli.quantity) / COUNT(DISTINCT o.order_id)) AS avg_order_value
FROM
    customers c
        JOIN
    orders o ON c.customer_id = o.customer_id
        JOIN
    order_line_items oli ON o.order_id = oli.order_id
GROUP BY
    c.name
ORDER BY
    avg_order_value DESC;