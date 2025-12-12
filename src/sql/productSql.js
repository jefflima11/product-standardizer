export const getAllProducts = `
        select
                p.cd_produto as codigo_produto,
                p.ds_produto as descricao_produto,
                f.dt as data_ultima_movimentacao,
                (trunc(sysdate) - trunc(to_timestamp(f.dt)))  as dia,
                decode(p.sn_padronizado, 'S', 'SIM', 'N', 'NAO') as padronizado,
                decode(p.sn_bloqueio_de_compra, 'S', 'SIM', 'N', 'NAO') as bloqueio_de_compra,
                decode(p.sn_pscotropico, 'S', 'SIM', 'N', 'NAO') as psicotropico,
                es.ds_especie as descricao_especie,
                tp_mvto_estoque as tipo_ultima_movimentacao,
                ds_classe as descricao_classe,
                ds_sub_cla as descricao_sub_classe
`;

export const dumpAllProducts = `
        select  
                dbahums.seq_padroniza_produtos.nextval,
                p.cd_produto as codigo_produto,
                p.sn_bloqueio_de_compra as bloqueio_de_compra,
                p.sn_padronizado as padronizado,
                p.sn_pscotropico as psicotropico,
                sysdate as data_alteracao,
                'DUMP AUTOMATICO' as ds_observacao,
                user as cd_usuario
        
`;

export const bodyQueryProducts = `
        from   
                dbamv.produto p
                Inner Join (
                        select
                                distinct
                                p.cd_produto,
                                max(ime.cd_mvto_estoque)cd_mvto_estoque,
                                max(ime.dh_mvto_estoque)dt,
                                c.ds_classe,
                                s.ds_sub_cla
                        from
                                dbamv.mvto_estoque me
                                Inner Join dbamv.itmvto_estoque ime On me.cd_mvto_estoque = ime.cd_mvto_estoque
                                Inner Join dbamv.produto p On ime.cd_produto = p.cd_produto
                                Inner Join dbamv.classe c On p.cd_classe = c.cd_classe And p.cd_especie = c.cd_especie
                                Inner Join dbamv.sub_clas s On p.cd_sub_cla = s.cd_sub_cla And p.cd_especie = s.cd_especie And p.cd_classe = s.cd_classe
                        where
                                p.cd_especie in (1)
                                and p.sn_movimentacao = 'S'
                                and me.tp_mvto_estoque in ('P','S')
                                and c.cd_classe in (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27)
                        group by   
                                p.cd_produto, 
                                c.ds_classe, 
                                s.ds_sub_cla
                        Order by   
                                p.cd_produto
                ) f On p.cd_produto = f.cd_produto
                Inner Join dbamv.mvto_estoque me On f.cd_mvto_estoque = me.cd_mvto_estoque
                Inner Join dbamv.estoque e On me.cd_estoque = e.cd_estoque
                Inner Join dbamv.est_pro ep On e.cd_estoque = ep.cd_estoque And p.cd_produto = ep.cd_produto
                Inner Join dbamv.especie es On p.cd_especie = es.cd_especie
        where
                p.sn_mestre = 'N'
                and p.sn_movimentacao = 'S'
        Order By 3,4
`;