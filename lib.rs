src/lib.rs|35 col 13 warning| unused variable: `delta_row`. `#[warn(unused_variables)]` on by default
src/lib.rs|35 col 13 info| if this is intentional, prefix it with an underscore
src/lib.rs|33 col 35 warning| unused variable: `row`. if this is intentional, prefix it with an underscore
src/lib.rs|33 col 45 warning| unused variable: `column`. if this is intentional, prefix it with an underscore
src/lib.rs|34 col 13 warning| variable does not need to be mutable. `#[warn(unused_mut)]` on by default
src/lib.rs|34 col 13 info| remove this `mut`
src/utils.rs|1 col 8 warning| function is never used: `set_panic_hook`. `#[warn(dead_code)]` on by default
src/lib.rs|22 col 5 warning| field is never read: `width`
src/lib.rs|23 col 5 warning| field is never read: `height`
src/lib.rs|24 col 5 warning| field is never read: `cells`
src/lib.rs|29 col 8 warning| associated function is never used: `get_index`
src/lib.rs|33 col 8 warning| associated function is never used: `live_neighbor_count`
