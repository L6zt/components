<template>
    <div class="container index-page-container">
        <jc-row
                class="nav-section-container"
        >
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/swiper">swiper</router-link>
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/select">select</router-link>
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/selectTree">selectTree</router-link>
                </section>
            </jc-col>
        </jc-row>
        <jc-row
                class="nav-section-container"
        >
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/radio">radio</router-link>
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/slider">slider</router-link>
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/button">button</router-link>
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="nav-links-box">
                    <router-link class="nav-link" to="/pagination">pagination</router-link>
                </section>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          commonPadding: 10
        }
      }
    }
</script>
<style lang="scss">
    @import "../assert/scss/minix";
    .index-page-container {
        .nav-links-box {
            position: relative;

            width: 100%;
            height: 200px;
            line-height: 200px;
            box-shadow: 0 0 1px #333;
            margin-top: 20px;
            cursor: pointer;
            transform: scale(.9, .9);
            transition: all ease-in-out 1s;
            text-align: center;
            font-size: 14px;
            background: #333;
            border-radius: 3px;
            &:hover {
                font-size: 20px;
                box-shadow:  0 0 3px #FFC107;
                transform:  scale(1, 1);
            }
            &>a{
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                padding: 10px;
                color: #fff;
            }
        }
    }
</style>
