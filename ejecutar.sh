#! /bin/bash
echo "1. Reiniciar servidor GTA "
echo "2. Ver Logs "
echo "3. Ver Logs tiempo real"
echo "4. Abrir BBDD "
echo "5. Backup BBDD "
echo -n "Elige una opcion:"
read opcion
echo "La opcion seleccionada es $opcion"

case $opcion in
    1)
        echo "Opcion 1"
        systemctl stop rageserv
        npm run build
        systemctl start rageserv
        ;;
    2)
        echo "Opcion 2"
        journalctl -u rageserv.service
        ;;
    3)
        echo "Opcion 3"
        tail -F serverLogs.log
        ;;	
    4)
        echo "Opcion 4"
        mysql -u root -p-Largun217 -D ragerp
        ;;
    5)
        echo "Opcion 5"
        now=$(date +"%Y_%m_%d__%H_%M_%S")
        mysqldump -u root -p-Largun217 ragerp > backups/ragerp_$now.sql
        ;;
    *)
        echo "Esa opcion no existe"
        ;;
esac